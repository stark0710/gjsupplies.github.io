import { useState } from "react";
import { Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingAddress {
  address: string;
  city: string;
  state: string;
  pincode: string;
  company?: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-warning/20 text-warning-foreground",
  confirmed: "bg-primary/20 text-primary",
  processing: "bg-primary/20 text-primary",
  shipped: "bg-success/20 text-success",
  delivered: "bg-success/20 text-success",
  cancelled: "bg-destructive/20 text-destructive",
};

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as Order[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status: status as any })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({ title: "Success", description: "Order status updated" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">View and manage customer orders</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery || statusFilter !== "all"
                  ? "No orders found matching your filters."
                  : "No orders yet. Orders will appear here when customers make purchases."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Order ID</th>
                      <th className="text-left py-3 px-2 font-medium">Customer</th>
                      <th className="text-left py-3 px-2 font-medium hidden md:table-cell">Date</th>
                      <th className="text-left py-3 px-2 font-medium">Total</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                      <th className="text-right py-3 px-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-3 px-2 font-mono text-sm">
                          {order.id.slice(0, 8)}...
                        </td>
                        <td className="py-3 px-2">
                          <div>
                            <div className="font-medium">{order.customer_name}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.customer_email}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 hidden md:table-cell">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="py-3 px-2 font-medium">
                          {formatPrice(order.total)}
                        </td>
                        <td className="py-3 px-2">
                          <Badge className={statusColors[order.status] || ""}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading">
                  Order #{selectedOrder.id.slice(0, 8)}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Status Update */}
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Status</p>
                    <Badge className={statusColors[selectedOrder.status] || ""}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => {
                      updateStatusMutation.mutate({ id: selectedOrder.id, status: value });
                      setSelectedOrder({ ...selectedOrder, status: value });
                    }}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p>{selectedOrder.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p>{selectedOrder.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p>{selectedOrder.customer_phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p>{formatDate(selectedOrder.created_at)}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <div className="text-sm">
                    {selectedOrder.shipping_address.company && (
                      <p>{selectedOrder.shipping_address.company}</p>
                    )}
                    <p>{selectedOrder.shipping_address.address}</p>
                    <p>
                      {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state}{" "}
                      {selectedOrder.shipping_address.pincode}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded bg-muted"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                        <p className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Total */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {selectedOrder.shipping_cost === 0
                        ? "Free"
                        : formatPrice(selectedOrder.shipping_cost)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
